import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  HiMiniTruck,
  HiMiniTag,
  HiMiniCalendar,
  HiMiniChartBar,
  HiMiniUser,
  HiMiniPhone,
  HiMiniUserGroup,
  HiMiniDocument,
  HiCheck
} from 'react-icons/hi2';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

function ContactFormContent() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function getS3FileAsync(fileName: string) {
    const getObjectParams = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: fileName
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 1800 });
    return url;

  }
  const uploadToS3 = async (file: File): Promise<string> => {
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const key = `licenses/${timestamp}-${randomString}.${fileExtension}`;

      const arrayBuffer = await file.arrayBuffer();

      const command = new PutObjectCommand({
        Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
        Key: key,
        Body: arrayBuffer,
        ContentType: file.type,
      });

      await s3Client.send(command);
      return await getS3FileAsync(key);
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  };

  const onSubmit = async (data: any) => {

    if (!executeRecaptcha) {
      setUploadError("Execute recaptcha not yet available");
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);

    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('contact_form');
      if (!token) return setUploadError("שגיאה בשליחת הטופס");
      let fileType: 'img' | 'pdf' | null = null;
      let fileUrl: string | null = null;

      if (data.license && data.license[0]) {
        const file = data.license[0];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();

        if (file.type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
          fileType = 'img';
        } else if (file.type === 'application/pdf' || fileExtension === 'pdf') {
          fileType = 'pdf';
        }

        if (fileType) {
          fileUrl = await uploadToS3(file);
        }
      }

      const formData = {
        ...data,
        fileType,
        fileUrl,
        recaptchaToken: token
      };

      const templateName = fileType === 'pdf' ? 'vento_lead_pdf' :
        !fileType ? "vento_lead_blank" : "vento_lead";
      const componentsArr = () => {
        const arr = [];
        if (fileType === 'pdf') arr.push({
          "type": "header",
          "parameters": [
            {
              "type": "document",
              "document": {
                "link": fileUrl,
                "filename": data.license[0].name
              }
            }
          ]
        });
        else if (fileType !== null) arr.push({
          "type": "header",
          "parameters": [
            {
              "type": "image",
              "image": {
                "link": fileUrl
              }
            }
          ]
        });

        arr.push({
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": formData.name
            },
            {
              "type": "text",
              "text": formData.phone
            },
            {
              "type": "text",
              "text": formData.make
            },
            {
              "type": "text",
              "text": formData.model
            },
            {
              "type": "text",
              "text": formData.year
            },
            {
              "type": "text",
              "text": formData.hand
            },
            {
              "type": "text",
              "text": formData.mileage
            }
          ]
        });
        return arr;
      }
      const waRequest = {
        "messaging_product": "whatsapp",
        "to": "972529100123",
        "type": "template",
        "template": {
          "name": templateName,
          "language": {
            "code": "he"
          },
          "components": componentsArr()
        }
      }
      const res = await fetch("https://graph.facebook.com/v22.0/"+import.meta.env.VITE_WA_ACCOUNT_ID+"/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+import.meta.env.VITE_WA_ACCOUNT_TOKEN
        },
        body: JSON.stringify(waRequest),
      });

      

      setIsSuccess(true);
      reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      setUploadError('שגיאה בשליחת הטופס. אנא נסה שנית.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate years array from 2000 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i).reverse();

  // Generate hands array from 0 to 10
  const hands = Array.from({ length: 11 }, (_, i) => i);

  return (
    <section id="contact-form" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="bg-sunset px-6 py-8 sm:p-10 sm:pb-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">קבל הצעה לרכב שלך</h2>
              <p className="mt-2 text-lg text-white opacity-90">
                מלא את הטופס כדי לקבל הצעה מיידית
              </p>
            </div>
          </div>

          <div className="px-6 py-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="make">יצרן </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniTruck className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="make"
                    maxLength={30}
                    className="pr-10"
                    placeholder="יצרן הרכב"
                    disabled={isSubmitting}
                    {...register("make", {
                      required: "שדה חובה",
                      maxLength: { value: 30, message: "מקסימום 30 תווים" }
                    })}
                  />
                </div>
                {errors.make && (
                  <p className="mt-1 text-sm text-red-600">{errors.make.message as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="model">דגם</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniTag className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="model"
                    maxLength={30}
                    className="pr-10"
                    placeholder="דגם הרכב"
                    disabled={isSubmitting}
                    {...register("model", {
                      required: "שדה חובה",
                      maxLength: { value: 30, message: "מקסימום 30 תווים" }
                    })}
                  />
                </div>
                {errors.model && (
                  <p className="mt-1 text-sm text-red-600">{errors.model.message as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="year">שנה</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniCalendar className="h-5 w-5" />
                  </div>
                  <select
                    id="year"
                    className="pr-10"
                    disabled={isSubmitting}
                    {...register("year", {
                      required: "שדה חובה"
                    })}
                  >
                    <option value="">בחר שנה</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year.message as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="hand">יד</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniUserGroup className="h-5 w-5" />
                  </div>
                  <select
                    id="hand"
                    className="pr-10"
                    disabled={isSubmitting}
                    {...register("hand", {
                      required: "שדה חובה"
                    })}
                  >
                    <option value="">בחר יד</option>
                    {hands.map((hand) => (
                      <option key={hand} value={hand}>
                        {hand === 0 ? 'יד ראשונה מחברה' : `יד ${hand}`}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.hand && (
                  <p className="mt-1 text-sm text-red-600">{errors.hand.message as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="mileage">קילומטראז'</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniChartBar className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    id="mileage"
                    min={0}
                    className="pr-10"
                    placeholder="10000"
                    disabled={isSubmitting}
                    {...register("mileage", {
                      required: "שדה חובה",
                      min: { value: 0, message: "קילומטראז' לא יכול להיות שלילי" }
                    })}
                  />
                </div>
                {errors.mileage && (
                  <p className="mt-1 text-sm text-red-600">{errors.mileage.message as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="license">רישיון רכב</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniDocument className="h-5 w-5" />
                  </div>
                  <input
                    type="file"
                    id="license"
                    accept="image/*,.pdf"
                    disabled={isSubmitting}
                    className="pr-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sunset/10 file:text-sunset hover:file:bg-sunset/20"
                    {...register("license")}
                  />
                </div>
                {errors.license && (
                  <p className="mt-1 text-sm text-red-600">{errors.license.message as string}</p>
                )}
                {uploadError && (
                  <p className="mt-1 text-sm text-red-600">{uploadError}</p>
                )}
              </div>

              <div>
                <label htmlFor="name">שם מלא</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniUser className="h-5 w-5" />
                  </div>
                  <input
                    autoComplete="name"
                    type="text"
                    id="name"
                    maxLength={30}
                    className="pr-10"
                    placeholder="ישראל ישראלי"
                    disabled={isSubmitting}
                    {...register("name", {
                      required: "שדה חובה",
                      maxLength: { value: 30, message: "מקסימום 30 תווים" }
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone">טלפון</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniPhone className="h-5 w-5" />
                  </div>
                  <input
                    autoComplete="tel"
                    type="tel"
                    id="phone"
                    maxLength={10}
                    className="pr-10"
                    placeholder="05********"
                    disabled={isSubmitting}
                    {...register("phone", {
                      required: "שדה חובה",
                      pattern: {
                        value: /^05\d{8}$/,
                        message: "מספר טלפון לא תקין (05********)"
                      }
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative ${isSuccess ? 'bg-green-500' : 'btn-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
                initial={false}
                animate={{
                  backgroundColor: isSuccess ? '#22c55e' : '#FF4500'
                }}
              >
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isSubmitting ? 0 : 1,
                    y: isSubmitting ? 10 : 0
                  }}
                >
                  {isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <HiCheck className="h-5 w-5" />
                      הטופס נשלח בהצלחה
                    </span>
                  ) : (
                    'שלח וקבל הצעה'
                  )}
                </motion.span>
                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </motion.div>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ContactForm() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  );
}
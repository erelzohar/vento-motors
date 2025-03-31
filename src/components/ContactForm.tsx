import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  HiMiniTruck,
  HiMiniTag,
  HiMiniCalendar,
  HiMiniChartBar,
  HiMiniUser,
  HiMiniPhone,
  HiMiniUserGroup,
  HiMiniDocument
} from 'react-icons/hi2';

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
                <label htmlFor="make">יצרן הרכב</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniTruck className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="make"
                    maxLength={30}
                    className="pr-10"
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
                    className="pr-10"
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
                    className="pr-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sunset/10 file:text-sunset hover:file:bg-sunset/20"
                    {...register("license", {
                      required: "שדה חובה"
                    })}
                  />
                </div>
                {errors.license && (
                  <p className="mt-1 text-sm text-red-600">{errors.license.message as string}</p>
                )}
              </div>

              <div>
                <label htmlFor="name">שם מלא</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <HiMiniUser className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    maxLength={30}
                    className="pr-10"
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
                    type="tel"
                    id="phone"
                    maxLength={10}
                    className="pr-10"
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

              <button
                type="submit"
                className="w-full btn-primary"
              >
                שלח וקבל הצעה
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
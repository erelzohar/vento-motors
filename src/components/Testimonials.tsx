import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { FaFacebook, FaStar, FaThumbsUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import globals from '../globals';

interface Review {
  name: string | null;
  picture: string | null;
  text: string;
  rating: number | null;
  createdTime: string;
}

const ELFSIGHT_APP_ID = 'cc630dad-0dd6-4e7c-97a3-1efe801504b1';
const dateFormat = new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });

export function Testimonials() {
  // null = loading, 'fallback' = API unavailable → Elfsight widget
  const [reviews, setReviews] = useState<Review[] | 'fallback' | null>(null);

  useEffect(() => {
    fetch(globals.reviewsUrl, { signal: AbortSignal.timeout(8000) })
      .then(res => res.ok ? res.json() : Promise.reject(new Error(`${res.status}`)))
      .then(body => setReviews(body.data?.length ? body.data : 'fallback'))
      .catch(() => setReviews('fallback'));
  }, []);

  return (
    <section className="relative py-16">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">מה הלקוחות אומרים</h2>
          <div className="h-1 w-24 bg-sunset mx-auto rounded-full"></div>
        </div>

        {reviews === null && <div className="h-72" aria-busy="true" />}
        {reviews === 'fallback' && <ElfsightReviews />}
        {Array.isArray(reviews) && <ReviewsCarousel reviews={reviews} />}
      </div>
    </section>
  );
}

function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // RTL: scrollLeft runs from 0 (start, right edge) to negative values
  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    const offset = Math.abs(track.scrollLeft);
    setAtStart(offset <= 1);
    setAtEnd(offset + track.clientWidth >= track.scrollWidth - 1);
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [reviews]);

  // direction 1 = next (moves left in RTL), -1 = previous
  const scrollPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: -direction * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative sm:px-12">
      <div
        ref={trackRef}
        onScroll={updateEdges}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
      >
        {reviews.map((review, i) => <ReviewCard key={`${review.createdTime}-${i}`} review={review} />)}
      </div>

      <CarouselArrow side="right" label="הביקורות הקודמות" disabled={atStart} onClick={() => scrollPage(-1)} />
      <CarouselArrow side="left" label="הביקורות הבאות" disabled={atEnd} onClick={() => scrollPage(1)} />
    </div>
  );
}

function CarouselArrow({ side, label, disabled, onClick }: {
  side: 'left' | 'right';
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === 'left' ? FaChevronLeft : FaChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'hidden sm:flex absolute top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full',
        'bg-white/90 text-gray-900 shadow-lg transition hover:bg-white disabled:opacity-30 disabled:cursor-default',
        side === 'left' ? 'left-0' : 'right-0'
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 180;

  return (
    <article className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex flex-col rounded-2xl bg-white/10 p-6 text-white backdrop-blur-sm">
      {review.rating ? (
        <div className="flex gap-1 text-yellow-400" aria-label={`${review.rating} כוכבים`}>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={clsx('h-4 w-4', i >= review.rating! && 'text-white/20')} />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-sm font-medium text-sunset-light">
          <FaThumbsUp className="h-4 w-4" />
          ממליץ/ה על ונטו מוטורס
        </div>
      )}

      <p className={clsx('mt-4 leading-relaxed text-gray-100 whitespace-pre-line', !expanded && 'line-clamp-5')}>
        {review.text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 self-start text-sm font-medium text-sunset-light hover:text-white"
        >
          {expanded ? 'הצג פחות' : 'קרא עוד'}
        </button>
      )}

      <footer className="mt-auto flex items-center gap-3 pt-6">
        <Avatar name={review.name} picture={review.picture} />
        <div className="min-w-0">
          <div className="truncate font-semibold">{review.name ?? 'לקוח/ה מפייסבוק'}</div>
          <div className="text-sm text-gray-400">{dateFormat.format(new Date(review.createdTime))}</div>
        </div>
        <FaFacebook className="ms-auto h-5 w-5 shrink-0 text-[#1877F2]" aria-label="ביקורת מפייסבוק" />
      </footer>
    </article>
  );
}

function Avatar({ name, picture }: { name: string | null; picture: string | null }) {
  const [broken, setBroken] = useState(false);

  if (picture && !broken) {
    return (
      <img
        src={picture}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="h-11 w-11 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sunset/80 text-lg font-bold">
      {name?.trim()[0] ?? '★'}
    </div>
  );
}

// Fallback while the reviews API is unavailable (e.g. token not configured yet)
function ElfsightReviews() {
  useEffect(() => {
    if (document.querySelector('script[src*="static.elfsight.com/platform"]')) return;
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="relative widget-container overflow-hidden px-6">
      <div className={`elfsight-app-${ELFSIGHT_APP_ID} w-full`} data-elfsight-app-lazy></div>
    </div>
  );
}

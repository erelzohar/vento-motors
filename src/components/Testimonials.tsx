import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { FaFacebook, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import reviewsData from '../data/reviews.json';

// A snapshot of the Facebook page's reviews, refreshed by `node scripts/fetch-reviews.mjs`
interface Review {
  id: string;
  name: string | null;
  rating: number | null;
  text: string;
  url: string;
  createdTime: string;
}

const reviews = reviewsData as Review[];
const FACEBOOK_REVIEWS_URL = 'https://www.facebook.com/ventomotors/reviews';
const dateFormat = new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });

const rated = reviews.filter((r) => r.rating);
const averageRating = rated.length ? rated.reduce((sum, r) => sum + (r.rating ?? 0), 0) / rated.length : null;

export function Testimonials() {
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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">מה הלקוחות אומרים</h2>
          <div className="h-1 w-24 bg-sunset mx-auto rounded-full"></div>
          <a
            href={FACEBOOK_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${averageRating ? `דירוג ${averageRating.toFixed(1)} מתוך 5, ` : ''}${reviews.length} ביקורות בפייסבוק`}
            className="mt-6 inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
          >
            <FaFacebook className="h-5 w-5 text-[#1877F2]" />
            {averageRating && (
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <FaStar className="h-4 w-4 text-yellow-400" />
                {averageRating.toFixed(1)}
              </span>
            )}
            <span>{reviews.length} ביקורות בפייסבוק</span>
          </a>
        </div>

        <ReviewsCarousel reviews={reviews} />
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
        {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
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
  const name = review.name ?? 'לקוח/ה מפייסבוק';

  return (
    <article className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex flex-col rounded-2xl bg-white/10 p-6 text-white backdrop-blur-sm">
      {review.rating && (
        <div className="flex gap-1 text-yellow-400" aria-label={`${review.rating} כוכבים`}>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={clsx('h-4 w-4', i >= review.rating! && 'text-white/20')} />
          ))}
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
        <Avatar name={review.name} />
        <div className="min-w-0">
          {/* dir="auto": a Latin name in this RTL page would otherwise lose its first letters */}
          <div dir="auto" className="break-words text-right font-semibold leading-tight">{name}</div>
          <div className="text-sm text-gray-400">{dateFormat.format(new Date(review.createdTime))}</div>
        </div>
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`הביקורת של ${name} בפייסבוק`}
          title="לביקורת בפייסבוק"
          className="ms-auto shrink-0 rounded-full p-1 text-[#1877F2] transition-transform hover:scale-110"
        >
          <FaFacebook className="h-5 w-5" />
        </a>
      </footer>
    </article>
  );
}

const AVATAR_COLORS = ['bg-sunset/80', 'bg-sky-600/80', 'bg-emerald-600/80', 'bg-violet-600/80', 'bg-amber-600/80'];

// Facebook's picture URLs expire, so every reviewer gets an initial in a colour of their own
function Avatar({ name }: { name: string | null }) {
  const letter = name?.trim()[0]?.toUpperCase() ?? '★';
  const color = AVATAR_COLORS[[...(name ?? '')].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_COLORS.length];

  return (
    <div
      aria-hidden="true"
      className={clsx('flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold', color)}
    >
      {letter}
    </div>
  );
}

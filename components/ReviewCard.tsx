type ReviewCardProps = {
  body: string;
  name: string;
  date: string;
  avatarText?: string;
};

export default function ReviewCard({ body, name, date, avatarText }: ReviewCardProps) {
  const initials = (avatarText ?? name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <article className="review-card" aria-label={`Review by ${name}`}>
      <div className="review-card-stars" aria-hidden="true">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <p className="body-text review-card-body">{body}</p>

      <div className="review-card-meta">
        <div className="review-card-meta-left">
          <span className="review-card-avatar" aria-hidden="true">
            {initials || "U"}
          </span>
          <span className="review-card-name">{name}</span>
          <span className="review-card-verified" aria-label="Verified user">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M4 8.5 6.7 11 12 5.5" />
            </svg>
          </span>
        </div>
        <span className="small-text subtitle-text review-card-date">{date}</span>
      </div>
    </article>
  );
}

import Card from "@/components/Card";

const EMOJIS = ["🥑", "🍳", "🍣", "🥦", "🥩", "🍜", "🍒", "🥗", "🥐"];

export default function EmojiGridCard() {
  return (
    <Card aria-hidden="true">
      <div className="emoji-grid">
        {EMOJIS.map((emoji, index) => (
          <span key={`${emoji}-${index}`} className="emoji-tile">
            {emoji}
          </span>
        ))}
      </div>
    </Card>
  );
}

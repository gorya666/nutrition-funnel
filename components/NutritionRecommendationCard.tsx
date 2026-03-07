import Card from "@/components/Card";

type NutritionRecommendationCardProps = {
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
};

export default function NutritionRecommendationCard({
  calories,
  carbs,
  proteins,
  fats,
}: NutritionRecommendationCardProps) {
  const total = Math.max(1, carbs + proteins + fats);
  const carbsPct = (carbs / total) * 100;
  const proteinsPct = (proteins / total) * 100;
  const fatsPct = (fats / total) * 100;

  return (
    <Card className="nutrition-card">
      <h2 className="title-3-text nutrition-card-title">Daily recommendation</h2>

      <p className="nutrition-calories-row">
        <span className="nutrition-energy-icon" aria-hidden="true">🥘</span>
        <span className="nutrition-calories-value">
          {calories.toLocaleString("en-US")}
        </span>
        <span className="nutrition-calories-unit">kcal</span>
      </p>

      <div className="nutrition-macro-bar" aria-hidden="true">
        <span
          className="nutrition-macro-segment nutrition-macro-carbs"
          style={{ width: `${carbsPct}%` }}
        />
        <span
          className="nutrition-macro-segment nutrition-macro-proteins"
          style={{ width: `${proteinsPct}%` }}
        />
        <span
          className="nutrition-macro-segment nutrition-macro-fats"
          style={{ width: `${fatsPct}%` }}
        />
      </div>

      <div className="nutrition-macro-grid">
        <div className="nutrition-macro-item">
          <p className="nutrition-macro-label">
            <span className="nutrition-dot nutrition-dot-carbs" />
            Carbs
          </p>
          <p className="nutrition-macro-value">{carbs} g</p>
        </div>

        <div className="nutrition-macro-item">
          <p className="nutrition-macro-label">
            <span className="nutrition-dot nutrition-dot-proteins" />
            Proteins
          </p>
          <p className="nutrition-macro-value">{proteins} g</p>
        </div>

        <div className="nutrition-macro-item">
          <p className="nutrition-macro-label">
            <span className="nutrition-dot nutrition-dot-fats" />
            Fats
          </p>
          <p className="nutrition-macro-value">{fats} g</p>
        </div>
      </div>

      <p className="small-text subtitle-text nutrition-note">
        Based on your goal, we calculated daily calories and macro balance.
      </p>
    </Card>
  );
}

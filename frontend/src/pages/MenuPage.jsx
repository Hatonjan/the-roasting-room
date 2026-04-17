import '../styles/pages/MenuPage.css'
import { menuCategories } from '../data/menuData'

export default function MenuPage() {
  return (
    <main className="menu-page">
      <h1>Menu</h1>
      <article className="menu-article">
        <h2>{menuCategories.drinks.title}</h2>
        <section className="drinks-section">
          
          
          {/* Hot Drinks Section */}
          {menuCategories.drinks.sections[0] && (
            <div className="hot-drinks">
              <h3>{menuCategories.drinks.sections[0].title}</h3>
              
              {/* Espresso & Coffee Subsection */}
              {menuCategories.drinks.sections[0].subsections[0] && (
                <div className="subsection">
                  <h4>{menuCategories.drinks.sections[0].subsections[0].title}</h4>
                  <ul>
                    {menuCategories.drinks.sections[0].subsections[0].items.map((item) => (
                      <li key={item.id}>
                        <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                        {item.description && <p>{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Not Coffee Subsection */}
              {menuCategories.drinks.sections[0].subsections[1] && (
                <div className="subsection">
                  <h4>{menuCategories.drinks.sections[0].subsections[1].title}</h4>
                  <ul>
                    {menuCategories.drinks.sections[0].subsections[1].items.map((item) => (
                      <li key={item.id}>
                        <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                        {item.description && <p>{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Cold Drinks Section */}
          {menuCategories.drinks.sections[1] && (
            <div className="cold-drinks">
              <h3>{menuCategories.drinks.sections[1].title}</h3>
              <ul>
                {menuCategories.drinks.sections[1].items.map((item) => (
                  <li key={item.id}>
                    <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                    {item.description && <p>{item.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="food-section">
          <h2>{menuCategories.food.title}</h2>
          <p className="food-subtitle">({menuCategories.food.subtitle})</p>
          <ul>
            {menuCategories.food.items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                {item.description && <p>{item.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
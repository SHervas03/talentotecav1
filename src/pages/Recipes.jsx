import Menus from "../data/Menus";

function Recipes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-4">
      {Menus.map((recipe) => (
        <div key={recipe.id}>
          <div className="max-w-auto bg-white border border-gray-200 rounded-lg shadow">
            <a href={recipe.link}>
              <img className="rounded-t-lg" src={recipe.image} alt={recipe.title} />
            </a>
            <div className="p-5">
              <a href={recipe.link}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">
                  {recipe.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 line-clamp-2">{recipe.description}</p>
              <a
                href={recipe.link}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-kelloggs rounded-lg hover:bg-kelloggsHover focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recipes;

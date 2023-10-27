import "./holofoil.css";

const CardC = function () {
  return (
    <div
      className="card dragon / masked"
      data-number="49"
      data-set="pgo"
      data-subtypes="vmax"
      data-supertype="pokémon"
      data-rarity="rare holo v"
      data-trainer-gallery="false"
      style={{
        "--pointer-x": "50%",
        "--pointer-y": "50%",
        "--pointer-from-center": 0,
        "--pointer-from-top": "0.5",
        "--pointer-from-left": "0.5",
        "--card-opacity": 0,
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
        "--background-x": "50%",
        "--background-y": "50%",
        "--card-scale": "1",
        "--translate-x": "0px",
        "--translate-y": "0px",
        width: "400px",
      }}
    >
      <div className="card__translater">
        <button
          className="card__rotator"
          aria-label="Expand the Pokemon Card; Dragonite V."
          tabIndex="0"
        >
          {/* <img
          className="card__back"
          src="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
          alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
          loading="lazy"
          width="660"
          height="921"
        />{" "} */}
          <div className="card__front">
            <img
              // src="https://images.pokemontcg.io/pgo/49_hires.png"
              src="/assets/images/card_example.png"
              alt="Front design of the Dragonite V Pokemon Card, with the stats and info around the edge"
              loading="lazy"
              width="660"
              height="921"
            />{" "}
            <div className="card__shine"></div>{" "}
            <div className="card__glare"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CardC;

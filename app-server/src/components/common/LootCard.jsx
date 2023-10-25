import React, { useMemo, useState, useEffect } from "react";
import $ from "jquery";
import "./style.css";

export default function LootCard({
  rarityPreset = "common",
  landscape = false,
  img,
  animationOptions = null,
  shineOptions = null,
  holographicOptions = null,
  size = null,
  shadowOptions = null,
  className = "",
  style = {},
}) {
  const rareCards = useMemo(() => ["legendary", "holographic"], []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const id = Math.floor(Math.random() * 100000 + Math.random() * 100000);

  useEffect(() => {
    let x, y, z;
    const $cards = $(`.card-holo-${id}`);
    const $style = $(".hover");
    let customStyles = `background-image: url(${img});`;

    if (size)
      customStyles += `height: ${size.height}px; width: ${size.width}px;`;
    if (shadowOptions && shadowOptions.default)
      customStyles += `box-shadow: -5px -5px 5px -5px ${shadowOptions.default.color1}, 5px 5px 5px -5px ${shadowOptions.default.color2}, -7px -7px 10px -5px transparent, 7px 7px 10px -5px transparent, 0 0 5px 0px rgba(255, 255, 255, 0), 0 55px 35px -20px rgba(0, 0, 0, 0.5);`;
    $cards.attr("style", customStyles);

    // // TODO: fix animations
    // if (animationOptions?.animatedOnIdle) {
    //   if (!$cards.hasClass("animated")) {
    //     clearInterval(y);
    //     clearTimeout(z);
    //     y = setInterval(() => {
    //       $cards.addClass("animated");
    //       z = setTimeout(() => $cards.removeClass("animated"), 12000);
    //     }, animationOptions?.intervalOnIdle || 5000);
    //   }
    // }

    $cards
      .on("mousemove touchmove", function (e) {
        // Normalise touch/mouse
        let pos = [e.offsetX, e.offsetY];
        e.preventDefault();
        if (e.type === "touchmove")
          pos = [e.touches[0].clientX, e.touches[0].clientY];

        const $card = $(this);

        // Math for mouse position
        const l = pos[0];
        const t = pos[1];
        const h = size?.height || $card.height();
        const w = size?.width || $card.width();
        const px = Math.abs(Math.floor((100 / w) * l) - 100);
        const py = Math.abs(Math.floor((100 / h) * t) - 100);
        const pa = 50 - px + (50 - py);

        // Math for gradient / background positions
        const lp = 50 + (px - 50) / 1.5;
        const tp = 50 + (py - 50) / 1.5;
        const px_spark = 50 + (px - 50) / 7;
        const py_spark = 50 + (py - 50) / 7;
        const p_opc = 20 + Math.abs(pa) * 1.5;
        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * 0.5;

        // Css to apply for active card
        const grad_pos = `background-position: ${lp}% ${tp}%;`;
        const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
        const opc = `opacity: ${p_opc / 100};`;
        const tf = `
          transform: rotateX(${ty}deg) rotateY(${tx}deg) rotateZ(${
            landscape ? "90deg" : "0"
          }); 
          ${customStyles}
        `;

        // Need to use a <style> tag for pseudo elements
        let style = "";
        if (
          rareCards.some((c) => rarityPreset.includes(c)) ||
          holographicOptions?.glow
        ) {
          style = `
            .card-holo-${id}:hover:before { ${grad_pos} }  /* gradient */
            .card-holo-${id}:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
          `;
        }

        if (shineOptions) {
          const { color1, color2 } = shineOptions;

          style += `
            .card-holo-${id}:before {
              background-image: linear-gradient(115deg, transparent 0%, ${color1}  25%, transparent 47%, transparent 53%, ${color2} 75%, transparent 100%);
            }
            .card-holo-${id}.active:before,
            .card-holo-${id}:hover:before {
              background-image: linear-gradient(110deg, transparent 25%, ${color1} 48%, ${color2} 52%, transparent 75%) !important;
            }
          `;
        }

        if (holographicOptions) {
          const { color1, color2, color3, color4, color5 } = holographicOptions;

          style += `
            .card-holo-${id}.holo:hover:before,
            .card-holo-${id}.holo.active:before {
              background-image: linear-gradient(115deg, transparent 20%, ${color1} 36%, ${color2} 43%, ${color3} 50%, ${color4} 57%, ${color5} 64%, transparent 80%) !important;
            }
          `;
        }

        if (shadowOptions && shadowOptions.default) {
          const { color1, color2 } = shadowOptions.default;

          style += `
            .card-holo-${id} {
              box-shadow: -5px -5px 5px -5px ${color1}, 5px 5px 5px -5px ${color2}, -7px -7px 10px -5px transparent, 7px 7px 10px -5px transparent, 0 0 5px 0px rgba(255, 255, 255, 0), 0 55px 35px -20px rgba(0, 0, 0, 0.5) !important;
            }      
          `;
        }

        if (shadowOptions && shadowOptions.hover) {
          const { color1, color2 } = shadowOptions.hover;

          style += `
            .card-holo-${id}:hover {
              box-shadow: -20px -20px 30px -25px ${color1}, 20px 20px 30px -25px ${color2}, -7px -7px 10px -5px ${color1}, 7px 7px 10px -5px ${color2}, 0 0 13px 4px rgba(255, 255, 255, 0.3), 0 55px 35px -20px rgba(0, 0, 0, 0.5);
            }          
          `;
        }

        // Set / apply css class and style
        $cards.removeClass("active");
        $card.removeClass("animated");
        $card.attr("style", tf);
        $style.html(style);
        clearInterval(y);
        clearTimeout(z);

        if (e.type === "touchmove") return false;

        clearTimeout(x);
      })
      // Remove css, apply custom animation on end
      .on("mouseout touchend touchcancel", function () {
        const $card = $(this);
        $style.html("");
        $card.removeAttr("style");
        $card.attr("style", customStyles);
        if (size)
          $card.css({ height: `${size.height}px`, width: `${size.width}px` });
        if (animationOptions?.animatedOnMouseOut)
          x = setTimeout(
            () => $card.addClass("animated"),
            animationOptions.delayOnMouseOut || 2500
          );

        // if (animationOptions?.animatedOnIdle) {
        //   if (!$cards.hasClass("animated")) {
        //     clearInterval(y);
        //     clearTimeout(z);
        //     y = setInterval(() => {
        //       $cards.addClass("animated");
        //       z = setTimeout(() => $cards.removeClass("animated"), 12000);
        //     }, animationOptions?.intervalOnIdle || 5000);
        //   }
        // }
      });
    setIsLoaded(true);
  }, [
    rareCards,
    rarityPreset,
    img,
    isFirstLoad,
    shineOptions,
    holographicOptions,
    shadowOptions,
    size,
    animationOptions,
  ]);

  useEffect(() => {
    if (isFirstLoad) setIsFirstLoad(false);
  }, []);

  if (!isLoaded) return null;

  return (
    <section className="cards" id="opening">
      <div
        className={`
          ${rarityPreset || ""}
          ${holographicOptions ? "holographic" : ""}
          ${
            rareCards.some(
              (c) => rarityPreset.includes(c) || holographicOptions
            )
              ? "holo"
              : ""
          } 
          card-holo card-holo-${id} 
          ${landscape ? "landscape" : ""}
          ${className || ""}
        `}
        style={{ backgroundImage: `url(${img})`, ...style }}
      />
      <style className="hover"></style>
    </section>
  );
}

import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

var panels = gsap.utils.toArray("section") as HTMLElement[];

panels.pop();

panels.forEach((panel) => {
  // Get the element holding the content inside the panel
  let innerpanel = panel.querySelector(".section-inner") as HTMLElement;

  // Get the Height of the content inside the panel
  let panelHeight = innerpanel.offsetHeight;

  // Get the window height
  let windowHeight = window.innerHeight;

  let difference = panelHeight - windowHeight;

  // ratio (between 0 and 1) representing the portion of the overall animation that's for the fake-scrolling. We know that the scale & fade should happen over the course of 1 windowHeight, so we can figure out the ratio based on how far we must fake-scroll
  let fakeScrollRatio =
    difference > 0 ? difference / (difference + windowHeight) : 0;

  // if we need to fake scroll (because the panel is taller than the window), add the appropriate amount of margin to the bottom so that the next element comes in at the proper time.
  if (fakeScrollRatio) {
    panel.style.marginBottom = panelHeight * fakeScrollRatio + "px";
  }

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "bottom bottom",
      end: () =>
        fakeScrollRatio ? `+=${innerpanel.offsetHeight}` : "bottom top",
      pinSpacing: false,
      pin: true,
      scrub: true,
    },
  });

  // fake scroll. We use 1 because that's what the rest of the timeline consists of (0.9 scale + 0.1 fade)
  if (fakeScrollRatio) {
    tl.to(innerpanel, {
      yPercent: -100,
      y: window.innerHeight,
      duration: 1 / (1 - fakeScrollRatio) - 1,
      ease: "none",
    });
  }
  tl.fromTo(
    panel,
    { scale: 1, opacity: 1 },
    { scale: 0.7, opacity: 0.5, duration: 0.9 },
  ).to(panel, { opacity: 0, duration: 0.1 });
});

// example html:
// <div class="slides-wrapper">
//   <section class="section section-1">
//     <div class="section-content">
//       <div class="section-inner">
//         <h1>Section 1</h1>
//         <img class="image" src="https://assets.codepen.io/16327/portrait-image-3.jpg" alt="" />
//       </div>
//     </div>
//   </section>
//   <section class="section section-2">
//     <div class="section-content">
//       <div class="section-inner">
//         <h1>Section 2</h1>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This section is long with text content and needs to be scrollable within before the next slide comes in.</p>
//         <p>This is the end...</p>
//       </div>
//     </div>
//   </section>
//   <section class="section section-3">
//     <div class="section-content">
//       <div class="section-inner">
//         <h1>Section 3</h1>
//         <img class="image" src="https://assets.codepen.io/16327/portrait-image-4.jpg" alt="" />
//       </div>
//     </div>
//   </section>
//   <section class="section section-4">
//     <div class="section-content">
//       <div class="section-inner">
//         <h1>Section 4</h1>
//         <img class="image" src="https://assets.codepen.io/16327/portrait-image-2.jpg" alt="" />
//       </div>
//     </div>
//   </section>
// </div>

// example css:
// html,
// body {
//   margin: 0;
//   height: 100%;
//   -webkit-overflow-scrolling: touch;
//   overflow-scrolling: touch;
// }

// body {
//   overflow-x: hidden;
//   overflow-y: scroll;
// }

// .nav {
//   width: 100%;
//   height: 60px;
//   position: fixed;
//   top: 0;
//   z-index: 999;
//   display: flex;
//   color: #fff;
//   background: #000;
//   justify-content: space-between;
// }

// .nav-links {
//   display: flex;
// }

// .slides-wrapper {
//   margin-top: 63px;
// }

// .image {
//   width: 50%;
//   aspect-ratio: 1/1;
//   object-fit: cover;
//   margin-top: 2.5rem;
// }

// .section {
//   width: 100%;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   font-weight: 600;
//   font-size: 1.5em;
//   text-align: center;
//   position: relative;
//   box-sizing: border-box;
//   background: var(--color-grey);
//   overflow: hidden;
// /*   border-radius: 10px; */
// }

// p {
//   max-width: 40ch;
//   padding: 2rem
// }

// .section-inner {
//   height: 100%;
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   align-items: center
// }

// .section-2 .section-inner {
//   height: auto;
//   padding-bottom: 20vh;
// }

// .section-2 {
//   background: var(--color-scroll-pink-lt);
//   color: var(--dark);
// }

// .section-1 {
//   background: var(--light);
//   color: var(--dark);
// }

// .section-4 {
//   background: var(--color-text-purple);
//   color: var(--dark);
// }
// .height {
//   border: dashed 2px grey;
//   padding: 1rem;
//   padding-bottom: 5rem;
// }

// .section h1 {
//   font-size: max(4rem, min(12vw + 1rem, 16rem));
//   font-weight: 600;
//   margin: 0 auto;
// }

// img {
// /*   border-radius: 8px; */
// }

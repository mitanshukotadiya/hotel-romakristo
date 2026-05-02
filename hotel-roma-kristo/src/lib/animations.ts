import gsap from "gsap";

export const fadeInUp = (target: gsap.TweenTarget, delay = 0) => {
  return gsap.fromTo(
    target,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay }
  );
};

export const fadeIn = (target: gsap.TweenTarget, delay = 0) => {
  return gsap.fromTo(
    target,
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.out", delay }
  );
};

export const clipReveal = (target: gsap.TweenTarget, delay = 0) => {
  return gsap.fromTo(
    target,
    { clipPath: "inset(100% 0 0 0)" },
    { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out", delay }
  );
};

export const slideInLeft = (target: gsap.TweenTarget, delay = 0) => {
  return gsap.fromTo(
    target,
    { x: -100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay }
  );
};

export const slideInRight = (target: gsap.TweenTarget, delay = 0) => {
  return gsap.fromTo(
    target,
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay }
  );
};

export const staggerUp = (targets: gsap.TweenTarget, stagger = 0.12) => {
  return gsap.fromTo(
    targets,
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger }
  );
};

export const scaleIn = (target: gsap.TweenTarget, delay = 0) => {
  return gsap.fromTo(
    target,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay }
  );
};

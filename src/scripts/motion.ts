import gsap from 'gsap';

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.hero-anim', {
    autoAlpha: 0,
    y: 12,
    duration: 0.5,
    stagger: 0.06,
    ease: 'power2.out',
    delay: 0.05,
  });
});

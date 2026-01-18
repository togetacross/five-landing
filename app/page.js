import Home from './components/Home.js';
import SeoHead from './components/SeoHead.js';

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="FIVE° Projekt"
        description="Új építésű - kulcsrakész eladó lakások, 5 percre Győr belvárosától. Prémium műszaki tartalom, átlátható döntések."
        path="/"
      />
      <Home />
    </>
  );
}

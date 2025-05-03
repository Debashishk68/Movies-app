import Slideshow from '../components/SlideShow';
import TopMovies from '../components/TopMovies';
// import TopSeries from '../components/TopSeries';
// import TopBollywood from '../components/TopBollywood';

const Home = () => {
  return (
    <div className="pt-20">
      <Slideshow />
      <section className="px-8 py-10">
        <TopMovies />
      </section>
      <section className="px-8 py-10">
        {/* <TopSeries /> */}
      </section>
      <section className="px-8 py-10">
        {/* <TopBollywood /> */}
      </section>
    </div>
  );
};

export default Home;

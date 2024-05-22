import { NextSeo } from "next-seo";

const AboutPage = () => {
  return (
    <>
      <NextSeo
        title="About"
        description="Welcome to medebd.com, your one-stop destination for all
        things healthcare in Bangladesh. We are proud to offer the
        most comprehensive and up-to-date directory of medicine
        brands, doctors, and hospitals in the country."
      />
      <div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold sm:text-4xl text-white">
                Our mission is to make healthcare information more accessible
                and easier to navigate for the people of Bangladesh
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <img
                  alt="freedom"
                  src="/images/about.jpg"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="lg:py-16">
                <article className="space-y-4 text-white">
                  <p>
                    Welcome to medebd.com, your one-stop destination for all
                    things healthcare in Bangladesh. We are proud to offer the
                    most comprehensive and up-to-date directory of medicine
                    brands, doctors, and hospitals in the country.
                  </p>

                  <p>
                    Our mission is to make healthcare information more
                    accessible and easier to navigate for the people of
                    Bangladesh. With our large collection of data, you can find
                    everything you need to know about medicine brands, including
                    dosage, side effects, and interactions. You can also search
                    for and find information about doctors, including their
                    qualifications, specialties, and contact information, as
                    well as hospitals and their location, facilities, and
                    specialties.
                  </p>
                  <p>
                    We believe that everyone should have access to reliable and
                    trustworthy healthcare information, and we are committed to
                    making that a reality. Whether you{""}re a patient, a
                    caregiver, or a healthcare professional, medebd.com is the
                    perfect resource for you.
                  </p>
                  <p>
                    Thank you for visiting medebd.com, and we hope that you find
                    our directory helpful and informative. If you have any
                    suggestions or feedback, please don{"'"}t hesitate to
                    contact us. We value your input and are always looking for
                    ways to improve our services.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;

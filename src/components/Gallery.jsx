import React from "react";

const Gallery = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap text-left">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            Office Galleries To Encourage You
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://cdn.pixabay.com/photo/2015/01/12/10/45/man-597178_1280.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://img.freepik.com/free-photo/smiling-diverse-businesswomen-shake-hands-group-meeting-deal-concept_1163-4686.jpg?w=1380&t=st=1699289063~exp=1699289663~hmac=62a70dc6951f77da5420310947f98c53315afb230a865b3a24d077e52c84b29d"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

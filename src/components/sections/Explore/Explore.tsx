import ExploreCards from '../../cards/ExploreCards/ExploreCards';

const ExploreComponent = () => {
  return (
    <div className="section-container flex justify-center items-center">
      <div className="flex flex-col items-center max-w-7xl px-8 w-full mb-8">
        <h1 className="heading p-4">Explore contents roles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
          <ExploreCards
            title="For Creators"
            link="/catalog"
            imageSrc="https://plus.unsplash.com/premium_photo-1727967194000-2301963b8ba5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <ExploreCards
            title="For Buyers"
            link="/catalog"
            imageSrc="https://plus.unsplash.com/premium_photo-1727967291564-aa94bd08cf46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreComponent;

const ExampleComponent = ({ ref }: { ref: React.Ref<HTMLParagraphElement> }) => {
  return (
    <>
      <p ref={ref} className="example-text">
        Maxime debitis hic, delectus perspiciatis laborum molestiae labore, deleniti, quam
        consequatur iure veniam alias voluptas nisi quo. Dolorem eaque alias, quo vel quas
        repudiandae architecto deserunt quidem, sapiente laudantium nulla. Maiores odit molestias,
        necessitatibus doloremque dolor illum reprehenderit provident nostrum laboriosam iste,
        tempore perferendis! Ab porro neque esse voluptas libero necessitatibus fugiat, ex, minus
        atque deserunt veniam molestiae tempora? Vitae. Dolorum facilis voluptate eaque eius
        similique ducimus dignissimos assumenda quos architecto. Doloremque deleniti non
        exercitationem rerum quam alias harum, nisi obcaecati corporis temporibus vero sapiente
        voluptatum est quibusdam id ipsa.
      </p>
    </>
  );
};

export default ExampleComponent;

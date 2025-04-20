const ExampleComponent2 = ({
  ref,
  keyword,
}: {
  ref: React.Ref<HTMLParagraphElement>;
  keyword: string;
}) => {
  return (
    <>
      <p ref={ref} className="example-text">
        {keyword}
      </p>
    </>
  );
};

export default ExampleComponent2;

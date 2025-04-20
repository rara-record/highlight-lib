const ExampleComponent3 = ({ ref }: { ref: React.Ref<HTMLParagraphElement> }) => {
  return (
    <>
      <p ref={ref} className="example-text">
        [VIP] 50% (important) file_v1x2 file_v1.2 React important_thing (React.js) React.js VIP
        [VIP]', '(React.js)', '50%', 'important', 'file_v1x2', 'file_v1.2 React React
      </p>
    </>
  );
};

export default ExampleComponent3;

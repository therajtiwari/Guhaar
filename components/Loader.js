export default function Loader() {
  console.log("in Loader");
  return (
    <div
      className="loader"
      style={{
        minHeight: "100vh",
        backgroundColor: "red",
        zIndex: "10000 !important",
      }}
    >
      <h3>Loading</h3>
    </div>
  );
}

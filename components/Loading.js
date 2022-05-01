import { css } from "@emotion/react";
import { BounceLoader } from "react-spinners";

const Loading = () => {

  const override = css`
    display: block;
  margin: 0 auto;
  border-color: red;`

  return (
    <div
      className="loader"
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BounceLoader
        color="#6f49fd"
        loading={true}
        css={override}
        size={120}
      />
    </div>);
}

export default Loading;
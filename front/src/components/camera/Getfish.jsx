import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { uploadfish_recoil } from "../../utils/atoms";
import "./Getfish.css";

function Getfish(props) {
  const [uploadfish, setUploadfish] = useRecoilState(uploadfish_recoil);
  const navigate = useNavigate();

  return (
    <div className="getfishcon">
      {uploadfish && uploadfish.fish && (
        <div className="getfishbox">
          <h1 style={{ textAlign: "center" }}>{uploadfish.fish.name}</h1>
          <div className="getfish-img-box">
            <img
              style={{ margin: "auto" }}
              src={`${process.env.REACT_APP_BACKEND_URL}${uploadfish.fish.imgUrl}`}
              alt=""
            />
          </div>
          <p
            style={{
              margin: "5% 0% 5% 0%",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            계측 : {uploadfish.size === 0 ? "미측정" : uploadfish.size}
          </p>
          <div className="fish-info">{uploadfish.fish.info}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "auto",
              marginTop: "5%",
              borderRadius: "5px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              onClick={() => navigate("/Camera")}
              style={{
                backgroundColor: "#ffb5d1",
                borderRadius: "10px",
                width: "50%",
              }}
            >
              다시 계측하기
            </div>
            <div
              onClick={() => navigate("/Inventory")}
              style={{
                backgroundColor: "rgb(165, 217, 255)",
                borderRadius: "10px",
                width: "50%",
              }}
            >
              인벤토리로 이동
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Getfish;

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
          <h1>{uploadfish.fish.name}</h1>
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
              fontWeight: "bold",
              paddingLeft: "1rem",
            }}
          >
            계측 :{" "}
            {uploadfish.size === 0
              ? "미측정"
              : uploadfish.size.toFixed(2) + " cm"}
          </p>
          <div className="fish-info">{uploadfish.fish.info}</div>
          <div className="fish-info-content">
            <div
              onClick={() => navigate("/Camera")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffb5d1",
                fontWeight: "bold",
                borderRadius: "10px",
                width: "50%",
                height: "2rem",
              }}
            >
              다시 계측하기
            </div>
            <div
              onClick={() => navigate("/Inventory")}
              style={{
                backgroundColor: "rgb(165, 217, 255)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                borderRadius: "10px",
                width: "50%",
                height: "2rem",
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

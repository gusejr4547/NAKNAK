import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { uploadfish_recoil } from "../../utils/atoms";

function Getfish(props) {
  const [uploadfish, setUploadfish] = useRecoilState(uploadfish_recoil);
  return (
    <div>
      {uploadfish && uploadfish.fish && (
        <div>
          <p>{uploadfish.fish.name}</p>
          <p>{uploadfish.fish.info}</p>
          <p>{uploadfish.size}</p>
        </div>
      )}
    </div>
  );
}

export default Getfish;

import { CSSProperties, FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonComponentProps {
  width?: string;
  height: string;
  bradius: string;
  containerStyle?: CSSProperties;
  skeletonStyle?: CSSProperties;
}

export const SkeletonComponent: FC<SkeletonComponentProps> = ({
  width = "auto",
  height,
  bradius,
  containerStyle,
  skeletonStyle,
}) => {
  return (
    <div style={{ height: height, width: width, ...containerStyle }}>
      <Skeleton
        className="skeleton"
        style={{
          height: "100%",
          borderRadius: bradius,
          ...skeletonStyle,
        }}
      />
    </div>
  );
};

export type SparklesProps = {
  delegated?: {
    [x: string]: string;
  };
};

export type SparkleProps = {
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
  };
};

import LoadingSpinner from "./LoadingSpinner";
import { useIsFetching } from "@tanstack/react-query";

export function Loading() {
  const isFetching = useIsFetching();
  const display = isFetching ? "inherit" : "none";

  return (
    <div style={{ display: display }}>
      <LoadingSpinner bladeNum={12} />
    </div>
  );
}

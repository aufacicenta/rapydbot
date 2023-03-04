export const CloseIcon = ({ className, variant }: { variant?: "small"; className?: string }) => {
  if (variant === "small") {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Crossed lines</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.9394 5.99908L0.469727 10.4688L1.53039 11.5294L6.00006 7.05974L10.4697 11.5294L11.5304 10.4688L7.06072 5.99908L11.5304 1.52941L10.4697 0.46875L6.00006 4.93842L1.53039 0.46875L0.469727 1.52941L4.9394 5.99908Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Crossed lines</title>
      <path
        d="M9.12132 8.06066L16.1213 1.06066L15.0607 0L8.06066 7L1.06066 0L0 1.06066L7 8.06066L0 15.0607L1.06066 16.1213L8.06066 9.12132L15.0607 16.1213L16.1213 15.0607L9.12132 8.06066Z"
        fill="currentColor"
      />
    </svg>
  );
};

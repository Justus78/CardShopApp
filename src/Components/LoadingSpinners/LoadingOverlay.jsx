import SpinnerMana from "./SpinnerMana";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <SpinnerMana />
    </div>
  );
}

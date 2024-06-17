export default function WaddleDee() {
  return (
    <div id="waddleDee" className="waddle-dee">
      <div className="parasol">
        <div className="parasol-top">
          <div className="parasol-top-material"></div>
          <div className="parasol-top-footer">
            <div className="parasol-top-footer-left"></div>
            <div className="parasol-top-footer-center"></div>
            <div className="parasol-top-footer-right"></div>
          </div>
        </div>
        <div className="parasol-stick"></div>
      </div>
      <div className="waddle-arm waddle-arm-left"></div>
      <div className="waddle-arm waddle-arm-right"></div>
      <div className="waddle-body">
        <div className="waddle-face">
          <div className="waddle-blush waddle-blush-left"></div>
          <div className="waddle-blush waddle-blush-right"></div>
          <div className="waddle-eye waddle-eye-left"></div>
          <div className="waddle-eye waddle-eye-right"></div>
        </div>
      </div>
      <div className="waddle-foot waddle-foot-left"></div>
      <div className="waddle-foot waddle-foot-right"></div>
    </div>
  );
}
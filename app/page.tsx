"use client";

import "react-placeholder/lib/reactPlaceholder.css";
import ReactPlaceholder from "react-placeholder";

export default function Home() {
  return (
    <div>
      <div>
        Header
        <ReactPlaceholder type="media" rows={7} ready={false}>
          Test
        </ReactPlaceholder>
      </div>
      <div>
        {/* Form */}
        <div>Template</div>
        <div>Node</div>
      </div>
    </div>
  );
}

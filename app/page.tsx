"use client";

import "react-placeholder/lib/reactPlaceholder.css";
import ReactPlaceholder from "react-placeholder";
import { Button, Link } from "@nextui-org/react";

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
        <div>
          Template
          <Button as={Link} color="primary" href="/create" variant="flat">
            Create
          </Button>
        </div>
        <div>Node</div>
      </div>
    </div>
  );
}

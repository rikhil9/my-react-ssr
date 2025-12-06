"use client";

import { ReactNode, useContext } from "react";
import { QueryContext } from "../contexts/query.provider";

export function SessionListClient({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  const { query } = useContext(QueryContext);

  return title.toLowerCase().includes(query.toLowerCase()) ? (
    <div className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch">
      {children}
    </div>
  ) : null;
}

import AppContainer from "../app-container";
import Link from "next/link";
import SessionsList from "./sessions-list";
import { Suspense } from "react";
import SessionQuery from "./session-query";
import QueryProvider from "../contexts/query.provider";

export const dynamic = "force-dynamic";

export default function SessionPage() {
  return (
    <AppContainer>
      <h2>Session</h2>

      <Suspense fallback={<SessionsListLoading />}>
        <QueryProvider>
          <SessionQuery />
          <Suspense fallback={<SessionsListLoading />}>
            <SessionsList />
          </Suspense>
        </QueryProvider>
      </Suspense>
      <Link href="/" className="btn btn-primary">
        ← Back to Home
      </Link>
    </AppContainer>
  );
}

function SessionsListLoading() {
  return (
    <div className="container">
      <div className="row">
        {[1, 2, 3].map(function (id: number) {
          return (
            <div className="container" key={id}>
              <div className="row">
                <div className="col-12 " key={id}>
                  <div className="card m-1">
                    <div className="row g-0">
                      <div className="col-7">
                        <div className="card-body">
                          <span className="wrapper">
                            <span style={{ visibility: "hidden" }}>
                              place holder - This represents the amount of text
                              that will be shown
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="col-5 align-middle mt-2 ">
                        <div className="card m-1">
                          <a target="#">
                            <div
                              className="spinner"
                              style={{ width: "105px", height: "105px" }}
                            ></div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

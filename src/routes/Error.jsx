import React, { useEffect, useState } from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  let token = localStorage.getItem("access_token");
  let rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (token && (rememberMe == true || rememberMe == false)) {
      setUrl("/dashboard");
    } else {
      setUrl("/");
    }
  }, []);
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div class="contant_box_404">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                  <i>{error.statusText || error.message}</i>
                </p>
                <Link to={`${url}`} class="link_404">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;

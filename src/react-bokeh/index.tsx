import React, { useEffect, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';

function ReactBokeh({ data }: any) {
  const id = useRef(
    `${Math.floor((new Date().getTime() / 1000) * Math.random())}`,
  );

  const loadBokeh = useCallback(
    (root) => {
      function embedDocument(root: any) {
        // FIXME: json으로 형식이 바뀔 경우 embed_item으로 수정
        root.Bokeh.embed.embed_item(data, `${id.current}`);
      }

      if (root.Bokeh) {
        embedDocument(root);
      } else {
        let attempts = 0;
        const timer = setInterval(
          function(root) {
            if (root.Bokeh) {
              clearInterval(timer);
              embedDocument(root);
            } else {
              attempts++;
              if (attempts > 10) {
                clearInterval(timer);
                console.log(
                  'Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing',
                );
              }
            }
          },
          1000,
          root,
        );
      }
    },
    [data],
  );

  useEffect(() => {
    if (data) loadBokeh(window);
    // return () => {
    //   const bkEl = document.querySelector(`.bk-root`);
    //   if (bkEl) bkEl.remove();
    // };
  });

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="./index.css" />
        <script
          type="text/javascript"
          src={`${process.env.REACT_APP_CDN_BOKEH_URL}`}
          crossOrigin="anonymous"
        />
      </Helmet>
      <div id={id.current} className="bk-root" />
    </>
  );
}

export default React.memo(ReactBokeh);

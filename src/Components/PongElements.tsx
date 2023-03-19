import React from "react";

interface TypeProps {
  edit?: string;
}

export function Pong({edit}:TypeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 381.926 570.638"
      className={`w-[30rem] h-[30rem] ${edit}`}
    >
      <defs>
        <filter id="Path_90">
          <feOffset dx="-10" dy="-10" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood flood-opacity="0.4" result="color" />
          <feComposite operator="out" in="SourceGraphic" in2="blur" />
          <feComposite operator="in" in="color" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
        <filter id="Path_99">
          <feOffset dx="-10" dy="-10" />
          <feGaussianBlur stdDeviation="3" result="blur-2" />
          <feFlood flood-opacity="0.4" result="color-2" />
          <feComposite operator="out" in="SourceGraphic" in2="blur-2" />
          <feComposite operator="in" in="color-2" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      <g
        id="Group_448"
        data-name="Group 448"
        transform="translate(-1085.115 -244.408)"
      >
        <g data-type="innerShadowGroup">
          <path
            id="Path_90-2"
            data-name="Path 90"
            d="M230.423,91.924H45.962A45.962,45.962,0,0,1,45.962,0H230.423a45.962,45.962,0,0,1,0,91.924Zm0,0"
            transform="translate(1302.917 290.37) rotate(120)"
            fill="#7970b3"
          />
          <g
            transform="matrix(1, 0, 0, 1, 1085.12, 244.41)"
            filter="url(#Path_90)"
          >
            <path
              id="Path_90-3"
              data-name="Path 90"
              d="M230.423,91.924H45.962A45.962,45.962,0,0,1,45.962,0H230.423a45.962,45.962,0,0,1,0,91.924Zm0,0"
              transform="translate(217.8 45.96) rotate(120)"
              fill="#fff"
            />
          </g>
        </g>
        <g data-type="innerShadowGroup">
          <path
            id="Path_99-2"
            data-name="Path 99"
            d="M230.423,91.924H45.962A45.962,45.962,0,0,1,45.962,0H230.423a45.962,45.962,0,0,1,0,91.924Zm0,0"
            transform="translate(1249.24 769.084) rotate(-60)"
            fill="#7970b3"
          />
          <g
            transform="matrix(1, 0, 0, 1, 1085.12, 244.41)"
            filter="url(#Path_99)"
          >
            <path
              id="Path_99-3"
              data-name="Path 99"
              d="M230.423,91.924H45.962A45.962,45.962,0,0,1,45.962,0H230.423a45.962,45.962,0,0,1,0,91.924Zm0,0"
              transform="translate(164.13 524.68) rotate(-60)"
              fill="#fff"
            />
          </g>
        </g>
        <g
          id="Group_447"
          data-name="Group 447"
          transform="translate(1193.734 543.188)"
        >
          <circle
            id="Ellipse_17"
            data-name="Ellipse 17"
            cx="41.106"
            cy="41.106"
            r="41.106"
            transform="translate(0 58.133) rotate(-45)"
            fill="#f2f2f2"
          />
          <path
            id="Path_100"
            data-name="Path 100"
            d="M1030.954,1223.968a41.1,41.1,0,0,0-57.981,58.024,41.106,41.106,0,1,1,57.981-58.024Z"
            transform="translate(-941.879 -1192.899)"
            fill="#fff"
            opacity="0.6"
          />
          <path
            id="Path_101"
            data-name="Path 101"
            d="M1050.549,1260.463a41.108,41.108,0,0,1-74.457,24.032,41.1,41.1,0,0,0,57.383-57.383A41.037,41.037,0,0,1,1050.549,1260.463Z"
            transform="translate(-951.311 -1202.33)"
            opacity="0.2"
          />
          <g
            id="Group_446"
            data-name="Group 446"
            transform="translate(58.133 47.62)"
            opacity="0.1"
          >
            <path
              id="Path_102"
              data-name="Path 102"
              d="M1084.56,1277.723a21.932,21.932,0,0,1,1.3,3.884,30.492,30.492,0,0,1,.711,4.066,32.826,32.826,0,0,1-.144,8.346,31.4,31.4,0,0,1-6.8,15.5,34.132,34.132,0,0,1-6.243,5.84c-.57.423-1.181.782-1.769,1.173l-.891.571c-.3.183-.619.336-.926.505l-1.859.985c-.635.292-1.281.557-1.92.835A41.794,41.794,0,0,1,1050,1322.67q1.863-.861,3.713-1.6c1.212-.571,2.426-1.093,3.622-1.633l1.764-.87c.583-.294,1.184-.54,1.743-.874,1.13-.638,2.292-1.194,3.366-1.893.545-.333,1.1-.652,1.633-.992l1.569-1.068c.258-.181.528-.346.777-.537s.5-.383.746-.575c.492-.388,1.01-.742,1.479-1.152s.941-.815,1.412-1.219a8.152,8.152,0,0,0,.678-.634l.658-.653.667-.643.616-.687c.4-.465.846-.9,1.206-1.394a36.518,36.518,0,0,0,6.832-13.078,47.124,47.124,0,0,0,1.574-7.516A57.862,57.862,0,0,0,1084.56,1277.723Z"
              transform="translate(-1050 -1277.723)"
            />
          </g>
          <path
            id="Path_103"
            data-name="Path 103"
            d="M1009.965,1258.393c-5.071,5.763-11.674,8.243-14.748,5.539s-1.455-9.569,3.616-15.333,11.674-8.243,14.748-5.539S1015.036,1252.629,1009.965,1258.393Z"
            transform="translate(-960.951 -1210.481)"
            fill="#fff"
            opacity="0.6"
          />
        </g>
      </g>
    </svg>
  );
}

export function PointsTop({ edit }: TypeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49 110"
      className={edit}
    >
      <g id="Group_456" data-name="Group 456" transform="translate(-144 -247)">
        <circle
          id="Ellipse_18"
          data-name="Ellipse 18"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(144 247)"
          fill="#7970b3"
        />
        <ellipse
          id="Ellipse_19"
          data-name="Ellipse 19"
          cx="7.5"
          cy="7"
          rx="7.5"
          ry="7"
          transform="translate(144 279)"
          fill="#414554"
        />
        <circle
          id="Ellipse_23"
          data-name="Ellipse 23"
          cx="7"
          cy="7"
          r="7"
          transform="translate(179 279)"
          fill="#414554"
        />
        <circle
          id="Ellipse_20"
          data-name="Ellipse 20"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(144 310)"
          fill="#414554"
        />
        <ellipse
          id="Ellipse_24"
          data-name="Ellipse 24"
          cx="7"
          cy="7.5"
          rx="7"
          ry="7.5"
          transform="translate(179 310)"
          fill="#414554"
        />
        <circle
          id="Ellipse_21"
          data-name="Ellipse 21"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(144 342)"
          fill="#414554"
        />
        <ellipse
          id="Ellipse_25"
          data-name="Ellipse 25"
          cx="7"
          cy="7.5"
          rx="7"
          ry="7.5"
          transform="translate(179 342)"
          fill="#7970b3"
        />
      </g>
    </svg>
  );
}

export function PointsBottom({ edit }: TypeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 49"
      className={edit}
    >
      <g
        id="Group_457"
        data-name="Group 457"
        transform="translate(-1719 -903.5)"
      >
        <circle
          id="Ellipse_26"
          data-name="Ellipse 26"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(1719 918.5) rotate(-90)"
          fill="#414554"
        />
        <ellipse
          id="Ellipse_27"
          data-name="Ellipse 27"
          cx="7.5"
          cy="7"
          rx="7.5"
          ry="7"
          transform="translate(1719 952.5) rotate(-90)"
          fill="#7970b3"
        />
        <circle
          id="Ellipse_28"
          data-name="Ellipse 28"
          cx="7"
          cy="7"
          r="7"
          transform="translate(1751 917.5) rotate(-90)"
          fill="#414554"
        />
        <circle
          id="Ellipse_29"
          data-name="Ellipse 29"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(1750 952.5) rotate(-90)"
          fill="#414554"
        />
        <ellipse
          id="Ellipse_30"
          data-name="Ellipse 30"
          cx="7"
          cy="7.5"
          rx="7"
          ry="7.5"
          transform="translate(1782 917.5) rotate(-90)"
          fill="#414554"
        />
        <circle
          id="Ellipse_31"
          data-name="Ellipse 31"
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(1782 952.5) rotate(-90)"
          fill="#414554"
        />
        <ellipse
          id="Ellipse_32"
          data-name="Ellipse 32"
          cx="7"
          cy="7.5"
          rx="7"
          ry="7.5"
          transform="translate(1814 917.5) rotate(-90)"
          fill="#7970b3"
        />
      </g>
    </svg>
  );
}

export function ArrowLeft({ edit }: TypeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 70 40"
      className={edit}
    >
      <g
        id="Group_452"
        data-name="Group 452"
        transform="translate(173 945.966) rotate(180)"
      >
        <path
          id="Polygon_1"
          data-name="Polygon 1"
          d="M20,0,40,35H0Z"
          transform="translate(173 905.966) rotate(90)"
          fill="#7970b3"
        />
        <path
          id="Polygon_2"
          data-name="Polygon 2"
          d="M20,0,40,35H0Z"
          transform="translate(138 905.966) rotate(90)"
          fill="#414554"
        />
      </g>
    </svg>
  );
}

export function ArrowRight({ edit }: TypeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 70 40"
      className={edit}
    >
      <g
        id="Group_451"
        data-name="Group 451"
        transform="translate(-103 -905.966)"
      >
        <path
          id="Polygon_1"
          data-name="Polygon 1"
          d="M20,0,40,35H0Z"
          transform="translate(173 905.966) rotate(90)"
          fill="#7970b3"
        />
        <path
          id="Polygon_2"
          data-name="Polygon 2"
          d="M20,0,40,35H0Z"
          transform="translate(138 905.966) rotate(90)"
          fill="#414554"
        />
      </g>
    </svg>
  );
}

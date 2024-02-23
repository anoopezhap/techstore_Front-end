// import { useEffect, useRef, useState } from "react";
// import usePersist from "../../hooks/usePersist";
// import { useDispatch, useSelector } from "react-redux";
// import { useQuery } from "@tanstack/react-query";
// import { refresh } from "./queries";
// import { Link, Outlet } from "react-router-dom";
// import { setCredentials } from "./authSlice";

// export default function PersistLogin() {
//   const [persist] = usePersist();
//   const { token } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   const effectRan = useRef(false);

//   const [trueSuccess, setTrueSuccess] = useState(false);
//   const [get, setGet] = useState(false);
//   console.log("get", get);
//   //   const { isLoading, isError, data, error, isSuccess } = useQuery({
//   //     queryFn: refresh,
//   //   });

//   //   if (isSuccess) {
//   //     console.log("data", data);
//   //   }

//   useEffect(() => {
//     if (effectRan.current === true) {
//       const verifyRefreshToken = async () => {
//         setGet((prev) => !prev);
//         console.log("get inside useffect", get);
//         console.log("verifying refresh token");
//         try {
//           const response = await refresh();
//           dispatch(setCredentials(response));
//           console.log("response", response);
//           setTrueSuccess(true);
//         } catch (err) {
//           console.log(err);
//         }
//       };

//       if (!token && persist) {
//         verifyRefreshToken();
//       }
//     }
//     return () => (effectRan.current = true);

//     //eslint-disable-next-line
//   }, []);

//   if (!persist) {
//     return <Outlet />;
//   }

//   if (persist) {
//     return <Outlet />;
//   }
// }

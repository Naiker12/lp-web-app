import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { CountdownScreen } from "../components/CountdownScreen";
import { NotFoundBanner } from "../components/NotFoundBanner";
import { useRedirect } from "../hooks/useRedirect";

const REDIRECT_DELAY_SECONDS = 5;

export function RedirectPage() {
  const { codigo } = useParams();
  const [seconds, setSeconds] = useState(REDIRECT_DELAY_SECONDS);
  const { notFound, error, resolve } = useRedirect();
  const resolvedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!codigo) {
      return;
    }

    void resolve(codigo).then((url) => {
      resolvedUrlRef.current = url;
    });
  }, [codigo, resolve]);

  useEffect(() => {
    if (notFound || error) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [error, notFound]);

  useEffect(() => {
    if (seconds === 0 && resolvedUrlRef.current) {
      window.location.replace(resolvedUrlRef.current);
    }
  }, [seconds]);

  if (!codigo || notFound) {
    return <NotFoundBanner codigo={codigo} />;
  }

  if (error) {
    return <NotFoundBanner codigo={codigo} />;
  }

  return <CountdownScreen seconds={seconds} />;
}

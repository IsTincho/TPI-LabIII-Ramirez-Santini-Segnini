  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 900);

    return () => clearTimeout(timeout);
  }, []);

  if (!render) {
    return "";
  }
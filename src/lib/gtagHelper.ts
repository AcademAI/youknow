export const pageview = (GA_MEASUREMENT_ID : string | undefined, url : string) => {
    (window as any).gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
    });
};
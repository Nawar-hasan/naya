export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!;

const pageview = () => {
  //@ts-expect-error added by a script
  window.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
const event = (name: string, options = {}) => {
  //@ts-expect-error added by a script
  window.fbq("track", name, options);
};
const faPixels = { event, pageview };
export default faPixels;

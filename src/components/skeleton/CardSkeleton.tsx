const CardSkeleton = () => {
  return (
    <article className="card">
      <div className="card__wrapper">
        <figure className="skeleton__image-wrapper">
          <div className="card__image skeleton__image"></div>
        </figure>
        <div className="card__heading skeleton__card-text"></div>
        <p className="card__text skeleton__card-text"></p>
      </div>
    </article>
  );
};

export default CardSkeleton;

import Icon from '../Icon';
export function Stars({ count }: { count: number }) {
  return (
    <div className="flex text-admin-primary">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon
          key={i}
          name="star"
          className={i < count ? 'text-admin-primary' : 'text-admin-outline-variant'}
          style={{ fontSize: '14px' }}
          filled
        />
      ))}
    </div>
  );
}

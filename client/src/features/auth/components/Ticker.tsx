import styles from './Ticker.module.css';

export default function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="border-t border-border ticker fixed bottom-0 w-full z-10 bg-bg">
      <div
        className={`${styles.tickerTrack} flex text-nowrap items-center h-8`}
      >
        {doubled.map((ticker, index) => (
          <div
            className={`${styles.tickerItem} text-muted font-mono text-xs uppercase px-8 flex gap-4`}
            key={index}
          >
            {ticker}
          </div>
        ))}
      </div>
    </div>
  );
}

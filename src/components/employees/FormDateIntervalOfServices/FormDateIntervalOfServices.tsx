'use client';

export default function FormDateIntervalOfServices() {
  return (
    <form>
      <label htmlFor="dateInitial">
        Data inicial:
        <input type="text" placeholder="ex: dd/mm/aaaa" />
      </label>
      <label htmlFor="dateFinal">
        Data Final:
        <input type="text" placeholder="ex: dd/mm/aaaa" />
      </label>
    </form>
  );
}

# Magiczny Przyjaciel — Lumi (prototyp 0.1)

Prototyp PWA 2D: karmienie, głaskanie, mini-gra kolorów, gwiazdki, rosnący ogród, lokalny zapis i cache offline. Bez reklam, kont i zewnętrznych zależności.

## Uruchomienie na komputerze

1. Zainstaluj Python 3, jeśli go nie masz.
2. Otwórz terminal w katalogu z plikami.
3. Uruchom `python -m http.server 8000` (na Windows może być `py -m http.server 8000`).
4. Otwórz `http://localhost:8000` w przeglądarce.
5. Po pierwszym załadowaniu i aktywacji service workera odłącz internet i odśwież stronę, aby sprawdzić tryb offline.

## Uruchomienie na telefonie

Wgraj cały folder jako statyczną stronę na hosting HTTPS, np. Cloudflare Pages lub GitHub Pages, i otwórz jej adres w Safari (iPhone) albo Chrome (Android). W Safari użyj Udostępnij → Dodaj do ekranu początkowego. W Chrome użyj opcji instalacji/dodania do ekranu głównego. PWA działa offline po pierwszym poprawnym załadowaniu i zapisaniu zasobów.

## Ważne

Zapis localStorage jest przypisany do przeglądarki/urządzenia. Wyczyszczenie danych strony może usunąć postęp. Gra nie jest jeszcze aplikacją natywną ani produktem gotowym do publikacji w sklepach. Nie ma płatności ani zbierania danych osobowych.

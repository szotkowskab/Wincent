<?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $file_path = '../data.json';


            $json_data = file_get_contents($file_path);
            $data = json_decode($json_data, true);


            $new_song = [
                "title" => ($_POST['title']),
                "author" => $_POST['author'],
                "text" => $_POST['text'],
                "tags" => [
                    "czech" => isset($_POST['tags']['czech']),
                    "foreign" => isset($_POST['tags']['foreign']),
                    "folk" => isset($_POST['tags']['folk']),
                    "carol" => isset($_POST['tags']['carol']),
                    "artificial" => isset($_POST['tags']['artificial']),
                ]
            ];


            $data['songs'][] = $new_song;


            if ($_POST['password'] !== "GK-Zpevnik-1953") {
                header('Location: ../wrong_password');
                exit;
            } else {
                file_put_contents($file_path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

                header('Location: ../song_added?id=' . count((array) $data['songs']) - 1);
                exit;
            }

        }
        ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles.css">
    <title>Zpěvník</title>
    <link rel="icon" type="image/x-icon" href="../img/favicon.png">
</head>

<body>
    <div class="header full-width flex">
        <div class="half-width flex align-center">
            <a class="logo" href=".."><img src="../img/logo.png" /></a>
        </div>
        <div class="half-width padding text-align-right flex justify-around flex-wrap">
            <a class="header__btn" href="../song_list">písně</a>
            <a class="header__btn" href="../search">vyhledávat</a>
            <a class="header__btn" href="../add_song">přidat</a>
        </div>
    </div>

    <div class="wrap">



        <h2>Přidat píseň</h2>
        <form method="post">
            <label for="title">název:</label><br>
            <input class="add_song_text_input" type="text" id="title" name="title" required><br><br>

            <label for="author">autor:</label><br>
            <input class="add_song_text_input" type="text" id="author" name="author" required><br><br>
            <label for="text">text: <a class="tooltip">ⓘ <span class="tooltiptext">Pro přidání akordu vložte akord do
                        složených závorek před slovo, nad kterým se má zobrazit. Tedy '{akord}text
                        písně'</span></a></label><br>
            <textarea class="add_song_text_input" id="text" name="text" rows="4" cols="50" required></textarea><br><br>

            <label>štítky:</label><br>
            <input type="checkbox" id="czech" name="tags[czech]">
            <label for="czech">česká</label><br>

            <input type="checkbox" id="foreign" name="tags[foreign]">
            <label for="foreign">zahraniční</label><br>

            <input type="checkbox" id="carol" name="tags[carol]">
            <label for="carol">koleda</label><br>

            <input type="checkbox" id="folk" name="tags[folk]">
            <label for="folk">lidová</label><br>

            <input type="checkbox" id="artificial" name="tags[artificial]">
            <label for="artificial">umělá</label><br><br>

            <label for="title">heslo:</label><br>
            <input class="add_song_text_input" type="text" id="password" name="password" required><br><br>

            <button type="submit">přidat</button>
        </form>
        

    </div>

    <div class="footer flex  margin-top flex-wrap">
        <div class="full-width padding flex text-align-center align-center justify-around flex-wrap">
            <a class="footer__btn">Tuto stránku vytvořila Barbora Szotkowská jako maturitní projekt pro Gymnázium
                Karviná ve
                školním roce 2024/25.</a>
            <a class="footer__btn" href="../credits">zdroje</a>
        </div>
    </div>
</body>

</html>
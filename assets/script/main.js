$(function () {

    //-----------------------------------------------------
    // ハンバーガーメニュー
    //-----------------------------------------------------
    const $trigger = $('#hamburger');
    const $gnav = $('#gnav');
    const $line = $('.hamburger__line');
    const point_header = window.matchMedia('screen and (min-width: 768px)');


    // ハンバーガーアイコンのクリック時の処理
    $trigger.on('click', function () {
        const expanded = $(this).attr('aria-expanded');
        if (expanded === 'false') {
            $(this).attr('aria-expanded', true).attr('aria-label', 'メニューを閉じる');
            $line.addClass('hamburger__line--expanded');
            $gnav
                .attr('aria-hidden', false)
                .css({ display: 'flex', overflow: 'hidden' })
                .hide()
                .stop(true, true)
                .slideDown();
        } else {
            $(this).attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
            $line.removeClass('hamburger__line--expanded');
            $gnav.attr('aria-hidden', true).stop(true, true).slideUp();
        }
    });

    // メニュー内リンクのクリック時の処理
    $('.gnav__item a').on('click', function () {
        if (!point_header.matches) {
            $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
            $line.removeClass('hamburger__line--expanded');
            $gnav.attr('aria-hidden', true).stop(true, true).slideUp();
        }
    });

    // 画面幅に応じたメニューの表示切り替え
    function checkBreakPoint() {
        if (point_header.matches) {
            $gnav.attr('aria-hidden', false).css('display', 'flex');
            $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
        } else {
            $trigger.attr('aria-expanded', false).attr('aria-label', 'メニューを開く');
            $gnav.attr('aria-hidden', true).hide();
        }
    }

    // 画面幅変更時にブレークポイントを確認
    point_header.addListener(checkBreakPoint);
    checkBreakPoint();

    //-----------------------------------------------------
    // スライダー
    //-----------------------------------------------------
    const mySwiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

    });
    //-----------------------------------------------------
    // アコーディオン
    //-----------------------------------------------------
    $('[aria-controls^="accordion"]').stop().on('click', function (e) {
        const $self = $(e.currentTarget);
        const $item = $self.closest('.accordion__item'); // 一番近い .accordion__item を取得
        const expanded = $self.attr('aria-expanded') === 'true';
        const $target = $('#' + $self.attr('aria-controls'));

        if (!expanded) {
            $self.attr({
                'aria-expanded': true,
                'aria-label': '回答パネルを閉じる'
            });
            $item.addClass('accordion__item--expanded'); // .accordion__item にクラスを追加
            $target.attr('aria-hidden', false).slideDown();
        } else {
            $self.attr({
                'aria-expanded': false,
                'aria-label': '回答パネルを開く'
            });
            $item.removeClass('accordion__item--expanded'); // .accordion__item からクラスを削除
            $target.attr('aria-hidden', true).slideUp();
        }
    });

});



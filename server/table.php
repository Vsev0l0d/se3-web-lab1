<?php if (!isset($_SESSION)) session_start(); ?>
<table>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Результат</th>
        <th>Время</th>
        <th>Время работы скрипта</th>
    </tr>
   <?php foreach ($_SESSION['history'] as $value) { ?>
    <tr>
        <td><?php echo $value[0] ?></td>
        <td><?php echo $value[1] ?></td>
        <td><?php echo $value[2] ?></td>
        <td><?php echo $value[3] ?></td>
        <td><?php echo $value[4] ?></td>
        <td><?php echo number_format($value[5], 10, ".", "")*1000000 ?></td>
    </tr>
    <?php }?>
</table>
DELETE FROM adm_core_item WHERE "itemName" LIKE '--test%';
DELETE FROM adm_core_description WHERE description LIKE '--test%';
DELETE FROM adm_def_background WHERE "backgroundId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_ammunition WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_armor WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_carry_capacity WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_damage WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_damage_versatile WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_proficiency WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_range WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_speed WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_unit WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_equipment_weapon WHERE "equipmentId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_proficiency WHERE "proficiencyId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_proficiency_ability_score WHERE "proficiencyId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_proficiency_language WHERE "proficiencyId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_picklist_item_ability_score WHERE "itemId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_picklist_item_damage_type WHERE "itemId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_picklist_item_order WHERE "itemId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_picklist_item_proficiency_category WHERE "itemId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_picklist_item_spell_component WHERE "itemId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_def_picklist_item_weapon_property WHERE "itemId" NOT IN (SELECT id FROM adm_core_item);
DELETE FROM adm_link WHERE "referenceId" NOT IN (SELECT id FROM adm_core_item) AND "referenceId" NOT IN (SELECT id FROM adm_core_description) 
AND "referenceId" NOT IN (SELECT id FROM adm_core_type) AND "referenceId" NOT IN (SELECT id FROM adm_core_list) 
AND "referenceId" NOT IN (SELECT id FROM adm_core_chart) AND "referenceId" NOT IN (SELECT id FROM adm_def_chart_column)
AND "referenceId" NOT IN (SELECT id FROM adm_def_chart_entry) AND "referenceId" NOT IN (SELECT id FROM adm_def_chart_row);
DELETE FROM adm_link_count WHERE "linkId" NOT IN (SELECT id FROM adm_link);
DELETE FROM adm_link_order WHERE "linkId" NOT IN (SELECT id FROM adm_link);
DELETE FROM adm_link_value_bool WHERE "linkId" NOT IN (SELECT id FROM adm_link);
DELETE FROM adm_link_value_number WHERE "linkId" NOT IN (SELECT id FROM adm_link);
DELETE FROM adm_link_value_number_range WHERE "linkId" NOT IN (SELECT id FROM adm_link);
DELETE FROM adm_core_list WHERE id NOT IN (SELECT "referenceId" FROM adm_link) AND id NOT IN (SELECT "targetId" FROM adm_link);

DELETE FROM adm_core_chart WHERE id NOT IN (SELECT "referenceId" FROM adm_link) AND id NOT IN (SELECT "targetId" FROM adm_link);
DELETE FROM adm_def_chart_column WHERE chartId NOT IN (SELECT id FROM adm_core_chart);
DELETE FROM adm_def_chart_entry WHERE chartId NOT IN (SELECT id FROM adm_core_chart);
DELETE FROM adm_def_chart_row WHERE chartId NOT IN (SELECT id FROM adm_core_chart);

/*  Authors:
 *    Petr Vobornik <pvoborni@redhat.com>
 *
 * Copyright (C) 2012 Red Hat
 * see file 'COPYING' for use and warranty information
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

define(['dojo/_base/declare',
        'dojo/_base/array',
        'dojo/_base/lang'
        ], function(declare, array, lang) {

    var construct = {
        /**
         * Helper modules
         */

        /**
         * Checks if supplied object is a construtor function.
         * It can recognize only classes declared by ''dojo/_base/declare''.
         */
        is_ctor: function(obj) {

            return typeof obj === 'function' && typeof obj.extend === 'function';
        },

        /**
         *  Finds out if object is a spec object.
         *
         *  Object is not a spec object when any of following applies:
         *   * has __fw_obj === true
         *   * has isInstanceOf function - basically tells if it's a instance of
         *                                 dojo-based class
         *
         */
        is_spec: function(obj) {
            var ret = false;
            if (typeof obj === 'object') {
                ret = obj.__fw_obj === true ||
                      typeof obj.isInstanceOf === 'function';
            }
            return !ret;
        },

        /**
         * Creates copy of construction specification
         *
         * It makes sure that pre_ops, post_ops and spec are new Arrays/Object
         */
        copy_cs: function(org_cs) {
            var cs = lang.mixin({}, org_cs);
            if (cs.spec) cs.spec = lang.mixin({}, cs.spec);
            cs.pre_ops = cs.pre_ops.slice(0);
            cs.post_ops = cs.pre_ops.slice(0);
            return cs;
        },

        no_cs_for_type_error: function(type) {
            return {
                error: 'No construction specification for given type',
                type: type
            };
        }
    };
    return construct;
});